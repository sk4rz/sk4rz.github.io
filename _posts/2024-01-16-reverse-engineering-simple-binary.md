---
layout: post
title: "Reverse Engineering a Simple Binary - Basic Assembly Analysis"
date: 2024-01-16 14:30:00 -0500
categories: [Reverse Engineering, Assembly]
tags: [assembly, reverse-engineering, gdb, analysis, malware-analysis]
lang: en
---

## Introduction

In this post, we'll explore basic binary analysis techniques using a simple C program. This is fundamental knowledge for anyone interested in reverse engineering and malware analysis.

## The Target Binary

Let's start with a simple C program that we'll analyze:

```c
#include <stdio.h>
#include <string.h>

int check_password(char* input) {
    char secret[] = "sk4rz_secret";
    
    if (strlen(input) != strlen(secret)) {
        return 0;
    }
    
    for (int i = 0; i < strlen(secret); i++) {
        if (input[i] != secret[i]) {
            return 0;
        }
    }
    
    return 1;
}

int main() {
    char buffer[100];
    
    printf("Enter password: ");
    fgets(buffer, sizeof(buffer), stdin);
    
    // Remove newline character
    buffer[strcspn(buffer, "\n")] = 0;
    
    if (check_password(buffer)) {
        printf("Access granted! Welcome sk4rz\n");
    } else {
        printf("Access denied!\n");
    }
    
    return 0;
}
```

## Compilation and Initial Analysis

First, let's compile our target:

```bash
gcc -o target -g target.c
```

The `-g` flag includes debugging symbols, which will help us during analysis.

## Static Analysis with `objdump`

Let's examine the assembly code:

```bash
objdump -d target | grep -A 20 "check_password"
```

This gives us the disassembly of our `check_password` function:

```assembly
0000000000001149 <check_password>:
    1149:	f3 0f 1e fa          	endbr64 
    114d:	55                   	push   %rbp
    114e:	48 89 e5             	mov    %rsp,%rbp
    1151:	48 83 ec 20          	sub    $0x20,%rsp
    1155:	48 89 7d e8          	mov    %rdi,-0x18(%rbp)
    1159:	48 b8 73 6b 34 72    	movabs $0x7a5f72346b73,%rax
    1160:	7a 5f 00 00 
    1164:	48 89 45 f2          	mov    %rax,-0xe(%rbp)
    1168:	c7 45 fa 73 65 63    	movl   $0x63657273,-0x6(%rbp)
    116f:	72 
    1170:	66 c7 45 fe 65 74    	movw   $0x7465,-0x2(%rbp)
    1176:	c6 45 ff 00          	movb   $0x0,-0x1(%rbp)
```

### Key Observations

1. **String Storage**: The secret string `"sk4rz_secret"` is stored directly in the binary
2. **Stack Layout**: Local variables are stored on the stack with predictable offsets
3. **Function Prologue**: Standard x86-64 function setup with `push %rbp` and `mov %rsp,%rbp`

## Dynamic Analysis with GDB

Let's run the binary under GDB to analyze its behavior:

```bash
gdb ./target
```

### Setting Breakpoints

```gdb
(gdb) break check_password
(gdb) break main
(gdb) run
```

### Examining Memory

When we hit the breakpoint in `check_password`:

```gdb
(gdb) x/s $rbp-0xe
0x7fffffffddf2:	"sk4rz_secret"

(gdb) x/s $rdi
0x7fffffffdde0:	"wrong_password"
```

### Stack Analysis

```gdb
(gdb) x/16x $rsp
0x7fffffffddd0:	0xffffdde0	0x00007fff	0x00000000	0x00000001
0x7fffffffdde0:	0x6f72775f	0x705f676e	0x77737361	0x00007264
0x7fffffffddf0:	0x00000000	0x00000000	0x72346b73	0x65735f7a
0x7fffffffde00:	0x74657263	0xf7e29d00	0x00007fff	0x555551d9
```

## Exploitation Possibilities

### Buffer Overflow Analysis

Looking at the `main` function:

```c
char buffer[100];
fgets(buffer, sizeof(buffer), stdin);
```

The `fgets` function properly limits input to 100 characters, preventing basic buffer overflows. However, there are other potential issues:

### Time-based Analysis

The password comparison loop can be vulnerable to timing attacks:

```python
import time
import subprocess

def time_password_attempt(password):
    start = time.time()
    proc = subprocess.run(['./target'], 
                         input=password.encode(), 
                         capture_output=True)
    end = time.time()
    return end - start

# This could potentially reveal information about correct characters
for char in 'abcdefghijklmnopqrstuvwxyz':
    attempt = 's' + char * 11
    timing = time_password_attempt(attempt)
    print(f"{attempt}: {timing:.6f}s")
```

## Assembly Analysis Deep Dive

Let's examine the comparison loop in detail:

```assembly
# String length comparison
call   strlen@plt
mov    %rax,%rbx      # Store input length
lea    -0xe(%rbp),%rdi # Load secret string address
call   strlen@plt     # Get secret length
cmp    %rbx,%rax      # Compare lengths
jne    1200 <check_password+0xb7>  # Jump if not equal

# Character-by-character comparison loop
mov    $0x0,%eax      # Initialize counter
jmp    11f0 <check_password+0xa7>

# Loop body
mov    %eax,%edx
mov    -0x18(%rbp),%rax  # Load input string
add    %rdx,%rax         # Add offset
movzbl (%rax),%edx       # Load input[i]
mov    %eax,%eax
movzbl -0xe(%rbp,%rax,1),%eax  # Load secret[i]
cmp    %al,%dl           # Compare characters
jne    1200 <check_password+0xb7>  # Exit if different
add    $0x1,%eax         # Increment counter
```

## Mitigation Techniques

To make this binary more secure:

1. **Constant-time comparison**:
```c
int secure_compare(const char* a, const char* b, size_t len) {
    int result = 0;
    for (size_t i = 0; i < len; i++) {
        result |= a[i] ^ b[i];
    }
    return result == 0;
}
```

2. **String obfuscation**:
```c
// XOR encoded secret
char encoded_secret[] = {0x1f, 0x0f, 0x52, 0x16, 0x1e, 0x13, /* ... */};
```

3. **Stack canaries**:
```bash
gcc -fstack-protector-strong -o target target.c
```

## Conclusion

This basic analysis demonstrates several key concepts in reverse engineering:

- **Static analysis** reveals program structure and embedded strings
- **Dynamic analysis** shows runtime behavior and memory layout
- **Assembly understanding** helps identify potential vulnerabilities
- **Timing attacks** can leak information even from "secure" comparisons

In real malware analysis, these techniques scale up to more complex scenarios involving:
- Packed binaries
- Anti-debugging techniques
- Encrypted strings
- Complex control flow obfuscation

## Tools Used

- **GCC**: Compilation with debugging symbols
- **objdump**: Disassembly and static analysis
- **GDB**: Dynamic analysis and debugging
- **Python**: Automation and timing analysis

Stay curious and keep analyzing! 🔍

{% include post-language-toggle.html spanish_url="/posts/analisis-basico-malware/" %}